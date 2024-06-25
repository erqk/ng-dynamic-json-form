import { FormControlConfig } from 'ng-dynamic-json-form';
import { CONFIG_DYNAMIC_POSTS_EN } from './config-dynamic-posts_en.constant';

export const CONFIG_DYNAMIC_POSTS_ZHTW: FormControlConfig[] = [
  {
    label: '貼文標籤',
    description: "提示: 選擇標籤含有 'love' 的選項",
    formControlName: 'tagsControl',
    type: 'select',
    layout: {
      hideLabel: true,
      descriptionPosition: 'after',
    },
    options: CONFIG_DYNAMIC_POSTS_EN.find(
      (x) => x.formControlName === 'tagsControl'
    )?.options,
  },
  {
    label: '已選擇標籤之貼文',
    formControlName: 'postWithTag',
    type: 'select',
    options: CONFIG_DYNAMIC_POSTS_EN.find(
      (x) => x.formControlName === 'postWithTag'
    )?.options,
  },
  {
    label: '搜尋貼文',
    formControlName: 'searchControl',
  },
  {
    label: '貼文搜尋結果',
    formControlName: 'resultPosts',
    type: 'select',
    options: CONFIG_DYNAMIC_POSTS_EN.find(
      (x) => x.formControlName === 'resultPosts'
    )?.options,
  },
];
