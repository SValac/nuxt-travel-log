import type { FetchError } from 'ofetch';

export default function getFetchErrorMessage(error: FetchError): string {
  return error.data?.statusMessage || error.statusMessage || 'An error occurred while adding the location.';
}
