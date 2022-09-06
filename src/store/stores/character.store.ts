import { ICharacter } from '../../types/character';
import characterService from '../../services/character.service';
import { CharactersQueryResult, Commit, State } from '../../types/interfaces';

const state: State = {
  characters: [],
  loading: false,
  info: {},
  error: null,
};

const mutations = {
  /**
   * Inicialize o estado de carregamento e redefina os erros
   * @param state estado da store
   */
  initCharacterRequest(state: State) {
    state.loading = true;
    state.error = false;
  },
  /**
   * Adiciona o personagens e suas informações pedidas e redefine loading e erros
   * @param state estado da store
   * @param QueryResult infos dos personagens e api
   */
  getCharactersSuccess(state: State, { results, info }: CharactersQueryResult) {
    state.characters = [...results];
    state.info = info;
    state.loading = false;
    state.error = false;
  },
  /**
   * Quando a solicitação retorna um erro, define o estado como erro e esvazia a lista de personagens
   * @param state estado da store
   * @param error erro retornado pela api
   */
  getCharactersError(state: State, error: unknown) {
    state.characters = [];
    state.info = {};
    state.loading = false;
    state.error = error;
  },
  /**
   * Adiciona ou recoloca o personagem selecionado a lista de personagens
   * @param state estado da store
   * @param character personagem requisitado
   */
  getCharacterSuccess(state: State, character: ICharacter) {
    const charIndex = state.characters.findIndex((x) => x.id === character.id);
    if (charIndex === -1) state.characters.push(character);
    else state.characters[charIndex] = character;
    state.loading = false;
    state.error = false;
  },
  /**
   * Quando a solicitação retorna um erro, define o estado como erro e esvazia a lista de personagens
   * @param state estado da store
   * @param error erro retornado pela api
   */
  getCharacterError(state: State, error: unknown) {
    state.loading = false;
    state.error = error;
  },
};

const actions = {
  /**
   * Busca dados do personagem da service e comita pra store
   * @param commit 
   * @param filter filtro de consulta
   */
  async fetchCharacters({ commit }: Commit, filter: any) {
    commit('initCharacterRequest');
    try {
      const characters = await characterService.getCharacters(filter);
      commit('getCharactersSuccess', characters.data);
    } catch (error) {
      commit('getCharactersError', error);
    }
  },
  /**
   * Busca dados do personagem pelo id, via service e comita pra store
   * @param commit 
   * @param data id do personagem
   */
  async fetchCharacterById({ commit }: Commit, data: { id: number }) {
    commit('initCharacterRequest');
    try {
      const char = await characterService.getCharacter(data.id);
      commit('getCharacterSuccess', char.data);
    } catch (error) {
      commit('getCharacterError', error);
    }
  },
};

const getters = {
  /**
   * Retorna o personagem buscado da store
   * @param state estado da store
   * @returns personagem requisitado
   */
  getStoredCharacterById: (state: State) => (id: number) =>
    state.characters.find((x) => x.id === id),
};

export default {
  state,
  mutations,
  actions,
  getters,
  modules: {},
};
