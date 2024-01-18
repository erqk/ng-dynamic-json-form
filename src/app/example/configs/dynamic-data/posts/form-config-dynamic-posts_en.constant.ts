import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_DYNAMIC_POSTS_EN: FormControlConfig[] = [
  {
    label: 'Post tags',
    description: "Hint: Try select the option that first tag is 'love'",
    formControlName: 'tagsControl',
    type: 'select',
    layout: {
      hideLabel: true,
      descriptionPosition: 'after',
    },
    options: {
      sourceList: [
        {
          src: 'https://dummyjson.com/posts',
          method: 'GET',
          data: {
            path: 'posts',
            labelKey: 'tags',
          },
        },
      ],
    },
  },
  {
    label: 'Posts from selected tag',
    formControlName: 'postWithTag',
    type: 'select',
    options: {
      trigger: {
        action: 'REQUEST',
        src: 'https://dummyjson.com/posts/search',
        method: 'GET',
        params: {
          q: 'tags.0',
        },
        data: {
          labelKey: 'title',
          path: 'posts',
        },
        triggerValuePath: 'tagsControl',
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
      trigger: {
        action: 'REQUEST',
        src: 'https://dummyjson.com/posts/search',
        method: 'GET',
        params: {
          q: '',
        },
        data: {
          labelKey: 'title',
          path: 'posts',
        },
        triggerValuePath: 'searchControl',
        debounceTime: 500,
      },
    },
  },
];
