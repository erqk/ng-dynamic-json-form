import { TestBed } from '@angular/core/testing';
import { FormControlConfig, OptionSourceConfig } from '../models';
import { FormGeneratorService } from './form-generator.service';
import { FormValidationService } from './form-validation.service';
import { GlobalVariableService } from './global-variable.service';
import { HttpRequestCacheService } from './http-request-cache.service';
import { OptionsDataService } from './options-data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

let formGeneratorService: FormGeneratorService;
let globalVariableService: GlobalVariableService;
let optionsDataService: OptionsDataService;

const configs: FormControlConfig[] = [
  {
    formControlName: 'tagsControl',
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
    formControlName: 'postWithTag',
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
            other: '000',
            q: 'tagsControl, tags.[,includes,"love"]',
          },
        },
      },
    },
  },
];

beforeAll(() => {
  TestBed.configureTestingModule({
    providers: [
      HttpClient,
      HttpHandler,
      HttpRequestCacheService,
      FormGeneratorService,
      FormValidationService,
      GlobalVariableService,
      OptionsDataService,
    ],
  });

  formGeneratorService = TestBed.inject(FormGeneratorService);
  globalVariableService = TestBed.inject(GlobalVariableService);
  optionsDataService = TestBed.inject(OptionsDataService);

  const form = formGeneratorService.generateFormGroup(configs);
  globalVariableService.rootForm = form;
});

it('should get { "other": "000", "q": "love" }', () => {
  const config = configs.find((x) => x.formControlName === 'postWithTag');
  const form = globalVariableService.rootForm;

  form?.patchValue({
    tagsControl: {
      id: 5,
      title: 'Hopes and dreams were dashed that day.',
      body: "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.",
      tags: ['crime', 'mystery', 'love'],
      reactions: {
        likes: 119,
        dislikes: 30,
      },
      views: 626,
      userId: 131,
    },
  });

  const result = optionsDataService['_mapBodyValue'](
    config!.options!.src as OptionSourceConfig
  );

  expect(result).toHaveProperty('other', '000');
  expect(result).toHaveProperty('q', 'love');
});
