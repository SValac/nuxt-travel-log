import type { SelectLocation } from '~~/lib/db/schema';
import type { MapPoint } from '~~/lib/types';

/*
  helper function to create MapPoint from location
  */
export function createMapPointFromLocation(location: SelectLocation): MapPoint {
  return {
    ...location,
    to: { name: 'dashboard-location-slug', params: { slug: location.slug } },
    toLabel: 'View Location',
  };
}

/*
  helper function to check if a point is selected
  */
export function isPointSelected(item: Pick<MapPoint, 'id' | 'lat' | 'long'> | null | undefined, selectedPoint: MapPoint | null | undefined,
) {
  if (!item || !selectedPoint)
    return false;

  return item.id === selectedPoint.id
    && item.lat === selectedPoint.lat
    && item.long === selectedPoint.long;
}
