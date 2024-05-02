import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OptionSource } from '../models';
import { OptionsDataService } from './options-data.service';

describe('OptionsDataService', () => {
  let service: OptionsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, OptionsDataService],
    });

    service = TestBed.inject(OptionsDataService);
  });

  // Set the value into the url section `:id`, using the value from the form control which is `10`.
  it('getMappedSrc() === https://jsonplaceholder.typicode.com/todos/10', () => {
    const config: OptionSource = {
      src: 'https://jsonplaceholder.typicode.com/todos/:id',
      method: 'GET',
      params: { id: '' },
      data: {
        labelKey: 'title',
      },
    };

    const src = service['_getMappedSrc'](config, 10);

    expect(src).toBe('https://jsonplaceholder.typicode.com/todos/10');
  });

  it('getMappedSrc() === https://dummyjson.com/posts/search?q=magic', () => {
    const config: OptionSource = {
      src: 'https://dummyjson.com/posts/search',
      method: 'GET',
      params: { q: '' },
      data: {
        labelKey: 'title',
      },
    };

    const src = service['_getMappedSrc'](config, 'magic');

    expect(src).toBe('https://dummyjson.com/posts/search?q=magic');
  });

  it('getMappedSrc() === https://dummyjson.com/posts/search?q=love', () => {
    const config: OptionSource = {
      src: 'https://dummyjson.com/posts/search',
      method: 'GET',
      params: { q: "tags.[,===,'love']" },
      data: {
        labelKey: 'title',
      },
    };

    const src = service['_getMappedSrc'](config, {
      tags: ['crime', 'love', 'mystery'],
    });

    expect(src).toBe('https://dummyjson.com/posts/search?q=love');
  });
});
