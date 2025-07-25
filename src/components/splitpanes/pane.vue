<template>
<div
  ref="paneEl"
  class="splitpanes__pane"
  @click="onPaneClick($event, uid)"
  :style="styles">
  <slot/>
</div>
</template>

<script setup lang="ts">
import { inject, ref, computed, onMounted, onBeforeUnmount, watch, getCurrentInstance, withDefaults } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { PaneData, PaneProps } from '@/types'

const props = withDefaults(defineProps<PaneProps>(), {
  minSize: 0,
  maxSize: 100
})

const requestUpdate = inject<(params: { uid: number; [key: string]: any }) => void>('requestUpdate')!
const onPaneAdd = inject<(pane: Omit<PaneData, 'index'>) => void>('onPaneAdd')!
const horizontal = inject<ComputedRef<boolean>>('horizontal')!
const onPaneRemove = inject<(uid: number) => void>('onPaneRemove')!
const onPaneClick = inject<(event: MouseEvent, paneId: number) => void>('onPaneClick')!

const uid = getCurrentInstance()?.uid!
const indexedPanes = inject<ComputedRef<Record<number, PaneData>>>('indexedPanes')!
const pane: ComputedRef<PaneData | undefined> = computed(() => indexedPanes.value[uid])

const paneEl: Ref<HTMLElement | null> = ref(null)
const sizeNumber: ComputedRef<number> = computed(() => {
  const value = isNaN(Number(props.size)) || props.size === undefined ? 0 : parseFloat(String(props.size))

  return Math.max(Math.min(value, maxSizeNumber.value), minSizeNumber.value)
})
const minSizeNumber: ComputedRef<number> = computed(() => {
  const value = parseFloat(String(props.minSize))
  return isNaN(value) ? 0 : value
})
const maxSizeNumber: ComputedRef<number> = computed(() => {
  const value = parseFloat(String(props.maxSize))
  return isNaN(value) ? 100 : value
})
const styles: ComputedRef<string> = computed(() => `${horizontal.value ? 'height' : 'width'}: ${pane.value?.size}%`)

watch(() => sizeNumber.value, (size: number) => requestUpdate({ uid, size }))
watch(() => minSizeNumber.value, (min: number) => requestUpdate({ uid, min }))
watch(() => maxSizeNumber.value, (max: number) => requestUpdate({ uid, max }))

onMounted(() => {
  onPaneAdd({
    id: uid,
    el: paneEl.value,
    min: minSizeNumber.value,
    max: maxSizeNumber.value,
    // The given size (useful to know the user intention).
    givenSize: props.size === undefined ? null : sizeNumber.value,
    size: sizeNumber.value // The computed current size at any time.
  })
})

onBeforeUnmount(() => onPaneRemove(uid))
</script>
