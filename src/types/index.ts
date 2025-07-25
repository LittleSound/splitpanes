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

export interface SplitpanesEmits {
  ready: []
  resize: [{ event: Event }]
  resized: [{ event?: Event; index?: number; panes: PaneData[] }]
  'pane-click': [{ event: Event; index: number; pane: PaneData }]
  'pane-maximize': [{ event: Event; index: number; pane: PaneData }]
  'pane-add': [{ pane: PaneData }]
  'pane-remove': [{ pane: PaneData }]
  'splitter-click': [{ event: Event; index: number }]
  'splitter-dblclick': [{ event: Event; index: number }]
}