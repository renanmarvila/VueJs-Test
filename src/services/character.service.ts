import { APIParams } from '../types/interfaces';
import axios, { AxiosResponse } from 'axios';
import { ICharacter } from '../types/character';

const serviceInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character/',
  headers: { Accept: 'application/json' },
  timeout: 10000,
});

export default {
  /**
   * Busca os personagens na API
   * @param params Query parameters
   * @returns Promise contendo a lista de todos os caracteres e suas infos
   */
  getCharacters(params: APIParams): Promise<AxiosResponse<ICharacter[]>> {
    return serviceInstance.get('', { params });
  },
  /**
   * Busca os personagens na API pelo ID
   * @param _id id do personagem desejado
   * @returns Promise contendo o personagem
   */
  getCharacter(_id: number): Promise<AxiosResponse<ICharacter>> {
    return serviceInstance.get(`${_id}`);
  },
};
