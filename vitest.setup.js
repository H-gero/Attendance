import { beforeEach } from 'vitest'
import { config } from '@vue/test-utils'

// Omitir warnings de componentes no stubbeados (como q-select)
config.global.stubs = {
  transition: false,
  teleport: false,
}