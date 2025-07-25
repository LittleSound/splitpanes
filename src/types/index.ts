export interface PaneData {
  id: number
  el: HTMLElement | null
  index: number
  min: number
  max: number
  size: number
  givenSize: number | null
}

export interface TouchState {
  mouseDown: boolean
  dragging: boolean
  activeSplitter: number | null
  cursorOffset: number
}

export interface SplitterTaps {
  splitter: number | null
  timeoutId: ReturnType<typeof setTimeout> | null
}

export interface DragPosition {
  x: number
  y: number
}

export interface PaneSums {
  prevPanesSize: number
  nextPanesSize: number
  prevReachedMinPanes: number
  nextReachedMinPanes: number
}

export interface PaneResizeVariables {
  sums: PaneSums
  panesToResize: number[]
}

export interface SplitpanesProps {
  horizontal?: boolean
  pushOtherPanes?: boolean
  maximizePanes?: boolean
  rtl?: boolean
  firstSplitter?: boolean
}

export interface PaneProps {
  size?: number | string
  minSize?: number | string
  maxSize?: number | string
}

// Base event payload types
export interface BaseEventPayload {
  event?: MouseEvent | TouchEvent
}

export interface EventWithIndex extends BaseEventPayload {
  event: MouseEvent | TouchEvent
  index: number
}

export interface EventWithPane extends EventWithIndex {
  pane: PaneData
}

export interface EventWithPanes extends BaseEventPayload {
  index?: number
  prevPane?: Pick<PaneData, 'min' | 'max' | 'size'>
  nextPane?: Pick<PaneData, 'min' | 'max' | 'size'>
  panes: Pick<PaneData, 'min' | 'max' | 'size'>[]
}

export interface SplitpanesEmits {
  ready: [EventWithPanes]
  resize: [EventWithPanes]
  resized: [EventWithPanes]
  'pane-click': [EventWithPane]
  'pane-maximize': [EventWithPane]
  'pane-add': [{ pane: PaneData }]
  'pane-remove': [{ pane: PaneData }]
  'splitter-click': [EventWithIndex]
  'splitter-dblclick': [EventWithIndex]
}