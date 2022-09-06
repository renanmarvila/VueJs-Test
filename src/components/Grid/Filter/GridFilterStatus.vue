<template>
  <fieldset class="flex space-x-4">
    <div
      v-for="cbStatus in typedStatusCheckboxesKey()"
      :key="cbStatus"
      class="flex items-center space-x-1"
    >
      <input
        :id="`radio_${cbStatus}`"
        type="checkbox"
        class="w-5 h-5 accent-green-500 dark:outline-black"
        v-model="statusCheckBoxes[cbStatus]"
        @change="check(cbStatus)"
      />
      <label :for="`radio_${cbStatus}`">{{ $t(cbStatus) }}</label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { Status } from '../../../types/interfaces';
import { PropType, ref, watch } from 'vue';

const props = defineProps({
  filter: {
    type: String as PropType<Status | 'reset'>,
    default: '',
  },
});
const emit = defineEmits(['update-status']);

const statusCheckBoxes = ref({
  dead: ref(false),
  alive: ref(false),
  unknown: ref(false),
});

if (props.filter && props.filter !== 'reset') {
  statusCheckBoxes.value[props.filter] = true;
}

const typedStatusCheckboxesKey = () => {
  return <Status[]>Object.keys(statusCheckBoxes.value);
};

/**
 * Variação entre as caixas, desmarcando as que não são desejadas
 * e atualizando o evento com o novo valor
 * @param status Novo status desejado
 */
const check = (status: Status | '') => {
  let oneChecked = false;
  // Variação entre as três caixas de status
  typedStatusCheckboxesKey().forEach((key) => {
    const v = statusCheckBoxes.value[key];

    // Se a caixa já estiver marcada, vai desmarcar
    statusCheckBoxes.value[key] = v ? key === status : v;
    oneChecked = statusCheckBoxes.value[key] || oneChecked;

    // Atualiza e envia o valor da caixa pro filtro
    if (statusCheckBoxes.value[key]) emit('update-status', key);
  });
  // Se nenhuma caixa estiver marcada, o filtro de pesquisa fica vazio
  if (!oneChecked) emit('update-status', '');
};

// Verifica uma atividade de atualização e então desmarca todas as caixas
watch(
  () => props.filter,
  (status) => {
    if (status === 'reset') check('');
  }
);
</script>
