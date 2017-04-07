/**
 * Created by Jakub Matuška on 27.01.2017.
 */
import {combineReducers} from 'redux';
import {load} from 'react-cookie';

const defaultState = {
  Categories: [
    {
      id: 0,
      name: 'Games',
      color: '#e0b84a',
      selected: true,
    },
    {
      id: 1,
      name: 'Websites',
      color: '#2972e8',
      selected: true,
    },
    {
      id: 2,
      name: 'Art',
      color: '#5ec649',
      selected: true,
    }
  ],

  Items: [
    {
      id: 0,
      name: 'U.F.O.',
      year: 2010,
      category: 0,
      description: "Hra UFO",
      picture: null,
      expanded: false,
      link: ""
    },
    {
      id: 1,
      name: 'Spaceship',
      year: 2011,
      category: 0,
      description: "Hra Spaceship",
      picture: null,
      expanded: false,
      link: ""
    },
    {
      id: 2,
      name: 'S-HELP',
      year: 2013,
      category: 1,
      description: "Stránka S-HELP",
      picture: "img/s-help.png",
      expanded: false,
      link: "https://s-help.sk/"
    },
    {
      id: 3,
      name: 'Jablko',
      year: 2011,
      category: 2,
      description: "",
      picture: "img/jablko.png",
      expanded: false,
      link: "img/jablko-full.png"
    },
  ],

  Editor: {
    Categories: [],
    Items: []
  },

  Loading: false,

  Message: {
    text: "",
    status: "",
    hidden: true
  },

  User: {
    username: load('username'),
    token: load('token'),
  },
};


const category = (state = defaultState.Categories, action) => {
  switch (action.type) {
    case 'CHECK_ALL':
      return state.map((category) => Object.assign({}, category, {selected: true}));

    case 'UNCHECK_ALL':
      return state.map((category) => Object.assign({}, category, {selected: false}));

    case 'TOGGLE_CATEGORY':
      return state.map((category) => {
        if (category.id !== action.id)
          return category;

        return Object.assign({}, category, {selected: !category.selected})
      });

    case 'LOAD_CATEGORIES':
      return action.categories.map((category) => {
        const original = state.find((cat) => cat.id === category.id);

        return Object.assign({}, original, category);
      });

    case 'CREATE_CATEGORY':
      return state.concat({
        id: action.id,
        color: action.color,
        name: action.name
      });

    case 'REMOVE_CATEGORY':
      return state.filter((category) => category.id !== action.id);

    default:
      return state;
  }
};

const items = (state = defaultState.Items, action) => {
  switch (action.type) {
    case 'TOGGLE_ITEM':
      return state.map((item) => {
        if (item.id !== action.id)
          return Object.assign({}, item, {expanded: false});

        return Object.assign({}, item, {expanded: !item.expanded})
      });

    case 'LOAD_ITEMS':
      return action.items.map((item) => {
        const original = state.find((it) => it.id === item.id);

        return Object.assign({}, original, item);
      });

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.id);

    case 'TOGGLE_CATEGORY':
    case 'CHECK_ALL':
    case 'UNCHECK_ALL':
      return state.map((item) => Object.assign({}, item, {expanded: false}));

    default:
      return state;
  }
};

const editorItems = (state = defaultState.Editor.Items, action) => {
  switch (action.type) {
    case 'TOGGLE_EDITOR_ITEM':
      return state.map((item) => {
        if (item.id !== action.id)
          return Object.assign({}, item, {expanded: false});

        return Object.assign({}, item, {expanded: !item.expanded})
      });

    case 'CHANGE_EDITOR_ITEM':
      return state.map((item) => {
        if (item.id !== action.id)
          return item;

        let replacement = {};
        replacement[action.field] = action.value;

        return Object.assign({}, item, replacement);
      });

    case 'RESET_EDITOR_ITEM':
      return state.map((item) => {
        if (item.id !== action.replacement.id)
          return item;

        return Object.assign({}, item, action.replacement);
      });

    case 'LOAD_ITEMS':
      return action.items.map((item) => {
        const original = state.find((it) => it.id === item.id);

        return Object.assign({}, original, item);
      });

    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.id);

    case 'ADD_EDITOR_ITEM':
      return state
        .map((item) => Object.assign({}, item, {expanded: false}))
        .concat({
          id: action.id,
          picture: '',
          name: "",
          year: (new Date).getFullYear(),
          link: '',
          category: action.categoryId,
          expanded: true,
          temporary: true
        });

    case 'TOGGLE_CATEGORY':
    case 'CHECK_ALL':
    case 'UNCHECK_ALL':
      return state.map((item) => Object.assign({}, item, {expanded: false}));

    default:
      return state;
  }
};


const loading = (state = false, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return state + 1;

    case 'LOADING_END':
      return state - 1;

    default:
      return state;
  }
};

const message = (state = defaultState.Message, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        text: action.text,
        status: action.status,
        addedTime: action.addedTime,
        hidden: false
      };

    case 'HIDE_MESSAGE':
      return Object.assign({}, state, {hidden: true});

    default:
      return state;
  }
};

const user = (state = defaultState.User, action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {username: action.username, token: action.token});

    case 'LOGOUT':
      return {username: undefined, token: undefined};

    default:
      return state;
  }
};

const editorCategories = (state = defaultState.Editor.Categories, action) => {
  switch (action.type) {
    case 'LOAD_CATEGORIES':
      return action.categories.map((category) => {
        const original = state.find((cat) => cat.id === category.id);

        return Object.assign({}, original, category);
      });

    case 'EDITOR_CATEGORY_CHANGE':
      let newField = {};
      newField[action.field] = action.value;

      return state.map((category) => {
        if (category.id !== action.id)
          return category;

        return Object.assign({}, category, newField);
      });

    case 'TOGGLE_COLOR_PICKER':
      return state.map((category) => {
        let changeTo = false;

        if (category.id === action.id)
          changeTo = !category.colorPicker;

        return Object.assign({}, category, {colorPicker: changeTo});
      });

    case 'RESET_EDITOR_CATEGORY':
      return state.map((category) => {
        if (category.id !== action.id)
          return category;

        return Object.assign({}, category, {
          id: action.id,
          color: action.color,
          name: action.name
        });
      });

    case 'SELECT_EDITOR_CATEGORY':
      return state.map((category) => {
        let changeTo = false;

        if (category.id === action.id)
          changeTo = !category.selected;

        return Object.assign({}, category, {selected: changeTo, colorPicker: false});
      });

    case 'ADD_EDITOR_CATEGORY':
      const r = Math.ceil((100 + Math.random() * 155)).toString(16);
      const g = Math.ceil((100 + Math.random() * 155)).toString(16);
      const b = Math.ceil((100 + Math.random() * 155)).toString(16);
      const color = '#' + r + g + b;

      return state.concat({
        id: action.id,
        color,
        name: "",
        temporary: true
      });

    case 'CREATE_CATEGORY':
      return state.map((category) => {
        if (category.id === action.id)
          return Object.assign({}, category, {temporary: false});

        return category;
      });

    case 'REMOVE_CATEGORY':
      return state.filter((category) => category.id !== action.id);

    default:
      return state;
  }
};


export default combineReducers({
  Categories: category,
  Editor: combineReducers({
    Categories: editorCategories,
    Items: editorItems
  }),
  Items: items,
  Loading: loading,
  Message: message,
  User: user
})