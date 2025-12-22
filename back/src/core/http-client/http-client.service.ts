import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(this.httpService.get<T>(url, config));
  }

  async post<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(this.httpService.post<T>(url, data, config));
  }

  async put<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(this.httpService.put<T>(url, data, config));
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return firstValueFrom(this.httpService.delete<T>(url, config));
  }
}
