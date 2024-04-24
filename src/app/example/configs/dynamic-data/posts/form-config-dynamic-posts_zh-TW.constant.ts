import { FormControlConfig } from 'ng-dynamic-json-form';

export const FORM_CONFIG_DYNAMIC_POSTS_ZHTW: FormControlConfig[] = [
  {
    label: '貼文標籤',
    description: "提示: 選擇標籤含有 'love' 的選項",
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
    label: '已選擇標籤之貼文',
    formControlName: 'postWithTag',
    type: 'select',
    options: {
      trigger: {
        action: 'REQUEST',
        src: 'https://dummyjson.com/posts/search',
        method: 'GET',
        params: {
          q: 'tags.[,includes,"love"]',
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
    label: '搜尋貼文',
    formControlName: 'searchControl',
  },
  {
    label: '貼文搜尋結果',
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
