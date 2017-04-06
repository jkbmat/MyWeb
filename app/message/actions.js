/**
 * Created by Jakub Matuška on 31.01.2017.
 */
export const MESSAGE_OK = 'message_ok';
export const MESSAGE_ERROR = 'message_error';
export const MESSAGE_TIMEOUT = 5000;

export const setMessage = (text, status, timeout) => (dispatch, getState) => {
  const addedTime = Date.now();
  const effectiveTimeout = timeout || MESSAGE_TIMEOUT;

  dispatch({
    type: 'SET_MESSAGE',
    status,
    text,
    addedTime
  });

  window.setTimeout(() => {
    const oldTime = getState().Message.addedTime;

    if (oldTime === addedTime)
      dispatch(hideMessage());
  }, effectiveTimeout)
};

export const hideMessage = () => ({
  type: 'HIDE_MESSAGE'
});