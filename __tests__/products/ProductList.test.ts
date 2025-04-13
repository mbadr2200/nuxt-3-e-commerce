import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductList from '~/layers/products/components/Product/List.vue'
import Skeleton from 'primevue/skeleton'
import BaseEmpty from '~/components/Base/Empty.vue'
import BaseButton from '~/components/Base/Button.vue'
import ProductCard from '~/layers/products/components/Product/Card.vue'

// Mock the useLocaleRoute composable
vi.mock('vue-router', () => ({
  useRoute: () => ({
    path: '/',
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock the ProductCard component
vi.mock('~/layers/products/components/Product/Card.vue', () => ({
  default: {
    template: '<div class="product-card">{{ product.name }}</div>',
    props: ['product'],
  },
}))

// Mock the BaseEmpty component
vi.mock('~/components/Base/Empty.vue', () => ({
  default: {
    template: '<div class="base-empty">No products found</div>',
  },
}))

// Mock the BaseButton component
vi.mock('~/components/Base/Button.vue', () => ({
  default: {
    template: '<button :disabled="loading"><slot /></button>',
    props: ['loading'],
  },
}))

// Mock the Icon component
vi.mock('~/components/Base/Icon.vue', () => ({
  default: {
    template: '<span class="icon"></span>',
  },
}))

// Mock the BaseSpinner component
vi.mock('~/components/Base/Spinner.vue', () => ({
  default: {
    template: '<span class="spinner"></span>',
  },
}))

describe('ProductList Component', () => {
  let wrapper: any
  const mockProducts = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ]

  beforeEach(() => {
    // Mount the component with fresh state for each test
    wrapper = mount(ProductList, {
      props: {
        products: [],
        loading: false,
        canFetchMore: false,
      },
      global: {
        components: {
          Skeleton,
          BaseEmpty,
          BaseButton,
          ProductCard,
        },
        stubs: {
          Icon: true,
          BaseSpinner: true,
        },
      },
    })
  })

  // Test basic rendering
  describe('Basic Rendering', () => {
    it('renders empty state when no products and not loading', async () => {
      await wrapper.setProps({ products: [], loading: false })
      expect(wrapper.findComponent(BaseEmpty).exists()).toBe(true)
      expect(wrapper.findComponent(ProductCard).exists()).toBe(false)
      expect(wrapper.findComponent(Skeleton).exists()).toBe(false)
    })

    it('renders loading skeletons when loading', async () => {
      await wrapper.setProps({ loading: true })
      expect(wrapper.findComponent(BaseEmpty).exists()).toBe(false)
      expect(wrapper.findComponent(ProductCard).exists()).toBe(false)
      expect(wrapper.findAllComponents(Skeleton)).toHaveLength(8)
    })

    it('renders product cards when products are available', async () => {
      await wrapper.setProps({ products: mockProducts, loading: false })
      expect(wrapper.findComponent(BaseEmpty).exists()).toBe(false)
      expect(wrapper.findComponent(Skeleton).exists()).toBe(false)
      expect(wrapper.findAllComponents(ProductCard)).toHaveLength(2)
    })
  })

  // Test load more functionality
  describe('Load More Functionality', () => {
    it('shows load more button when canFetchMore is true', async () => {
      await wrapper.setProps({ canFetchMore: true })
      expect(wrapper.findComponent(BaseButton).exists()).toBe(true)
      expect(wrapper.findComponent(BaseButton).text()).toBe('Load More')
    })

    it('hides load more button when canFetchMore is false', async () => {
      await wrapper.setProps({ canFetchMore: false })
      expect(wrapper.findComponent(BaseButton).exists()).toBe(false)
    })

    it('emits loadMore event when load more button is clicked', async () => {
      await wrapper.setProps({ canFetchMore: true })
      await wrapper.findComponent(BaseButton).trigger('click')
      expect(wrapper.emitted('loadMore')).toBeTruthy()
    })

    it('shows loading state on load more button when loading', async () => {
      await wrapper.setProps({ canFetchMore: true, loading: true })
      const button = wrapper.findComponent(BaseButton)
      expect(button.props('loading')).toBe(true)
    })
  })

  // Test grid layout
  describe('Grid Layout', () => {
    it('has correct grid classes', () => {
      const grid = wrapper.find('.grid')
      expect(grid.classes()).toContain('grid-cols-1')
      expect(grid.classes()).toContain('sm:grid-cols-2')
      expect(grid.classes()).toContain('lg:grid-cols-4')
    })

    it('has correct gap classes', () => {
      const grid = wrapper.find('.grid')
      expect(grid.classes()).toContain('gap-x-6')
      expect(grid.classes()).toContain('gap-y-10')
      expect(grid.classes()).toContain('xl:gap-x-8')
    })
  })

  // Test container layout
  describe('Container Layout', () => {
    it('has correct max width classes', () => {
      const container = wrapper.find('.max-w-2xl')
      expect(container.classes()).toContain('lg:max-w-7xl')
    })

    it('has correct padding classes', () => {
      const container = wrapper.find('.px-4')
      expect(container.classes()).toContain('lg:px-8')
    })
  })
}) 