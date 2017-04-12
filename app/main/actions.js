/**
 * Created by Jakub Matuška on 11.04.2017.
 */

export const closeOverlay = () => ({
  type: 'CLOSE_OVERLAY'
});

export const setOverlay = (picture) => ({
  type: 'SET_OVERLAY',
  picture
});