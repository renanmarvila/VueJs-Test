import { ICharacter } from './character';

export interface APIInfos {
  count?: number;
  pages?: number;
  next?: string;
  prev?: string;
}

export interface APIParams {
  page?: number;
  name?: string;
  status?: string;
}

export interface CharactersQueryResult {
  results: ICharacter[];
  info?: APIInfos;
}

export interface State {
  characters: ICharacter[];
  loading: boolean;
  error: any;
  info?: APIInfos;
}

export interface Commit {
  commit: Function;
}

export type Status = 'dead' | 'alive' | 'unknown';
