import { createAuthClient } from 'better-auth/vue';

const authClient = createAuthClient();

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    console.log('Initializing auth store...');
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }
  const user = computed(() => session.value?.data?.user);
  const isLoading = computed(() => session.value?.isPending);

  async function signIn() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append('csrf-token', csrf);
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append('csrf-token', csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    navigateTo('/'); // Redirect to home after sign out
  }

  return {
    init,
    signIn,
    signOut,
    isLoading,
    user,
  };
});
