import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_DYNAMIC_POSTS_EN: FormControlConfig[] = [
  {
    label: 'Post tags',
    description: "Hint: Try select the option that tag contains 'love'",
    formControlName: 'tagsControl',
    type: 'select',
    layout: {
      hideLabel: true,
      descriptionPosition: 'after',
    },
    options: {
      src: {
        url: 'https://dummyjson.com/posts',
        method: 'GET',
        mapData: {
          contentPath: 'posts',
          labelKey: 'tags',
        },
      },
    },
  },
  {
    label: 'Posts from selected tag',
    formControlName: 'postWithTag',
    type: 'select',
    options: {
      src: {
        url: 'https://dummyjson.com/posts/search',
        method: 'GET',
        mapData: {
          labelKey: 'title',
          contentPath: 'posts',
        },
        trigger: {
          by: 'tagsControl',
          body: {
            q: 'tagsControl, tags.[,includes,"love"]',
          },
        },
      },
    },
  },
  {
    label: 'Search post',
    formControlName: 'searchControl',
  },
  {
    label: 'Posts search result',
    formControlName: 'resultPosts',
    type: 'select',
    options: {
      src: {
        url: 'https://dummyjson.com/posts/search',
        method: 'GET',
        mapData: {
          labelKey: 'title',
          contentPath: 'posts',
        },
        trigger: {
          by: 'searchControl',
          body: {
            q: 'searchControl',
          },
          debounceTime: 500,
        },
      },
    },
  },
];
