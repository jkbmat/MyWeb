/**
 * Created by Jakub Matuška on 27.01.2017.
 */

export const getCategoryById = (store, id) => store.Categories.find((category) => category.id === id);

export const getCategoryIds = (store) => store.Categories.map((category) => category.id);

export const getItemById = (store, id) => store.Items.find((item) => item.id === id);

export const isLoggedIn = (state) => state.User.username !== undefined && state.User.token !== undefined;

export const getEditorCategoryById = (state, id) => state.Editor.Categories.find((category) => category.id === id);

export const makeToken = (state) => 'Token ' + state.User.token;

export const getSelectedEditorCategory = (state) => state.Editor.Categories.find((category) => category.selected);

export const getSelectedEditorItem = (state) => state.Editor.Items.find((item) => item.selected);

export const commonPropsDiffer = (a, b, ignore = []) => {
  if (typeof a !== typeof b)
    return true;

  if (typeof a !== 'object')
    return a !== b;

  for (const prop in a) {
    if (ignore.indexOf(prop) >= 0)
      continue;

    if (!a.hasOwnProperty(prop))
      continue;

    if (b.hasOwnProperty(prop) && commonPropsDiffer(a[prop], b[prop]))
      return true;
  }

  return false
};