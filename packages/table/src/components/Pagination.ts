/* eslint-disable @typescript-eslint/no-unused-expressions */
import EventEmitter from 'eventemitter3';
import styles from './styles.module.scss';

// 简化的Token类型，仅包含分页组件需要的属性
export type TToken = {
  colorPrimary?: string;
  colorBorder?: string;
  colorText?: string;
  colorBg?: string;
  fontSize?: number;
  fontFamily?: string;
  borderRadius?: number;
  dvPagination?: Record<string, string>;
  [key: string]: string | number | Record<string, string> | undefined;
};

export interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange?: ((page: number) => void) | null;
  token?: Partial<TToken>;
}

type EventTypes = {
  /** 选择事件 */
  'click:changed': (event: { type: string; page: number }) => void;
};

class Pagination extends EventEmitter<EventTypes> {
  private totalPages: number;

  private currentPage: number;

  private onPageChange: ((page: number) => void) | null;

  private __$dom!: HTMLElement;

  private __token?: Partial<TToken> | null = null;

  constructor(
    wrapper: HTMLElement,
    { totalCount, pageSize, currentPage, onPageChange, token }: PaginationProps
  ) {
    super();
    this.totalPages = Math.ceil(totalCount / pageSize);
    this.currentPage = currentPage;
    this.__token = token || this.__token;
    this.onPageChange = onPageChange || null;
    this.__$dom = document.createElement('div');
    this.__$dom.classList.add(styles.wrapper, styles['theme-container']);
    wrapper.appendChild(this.__$dom);

    this.__init();
  }

  private __init() {
    this.__initTheme();
    this.__render();
  }

  /** 初始化主题 */
  private __initTheme() {
    const themeConfig = this.__token?.dvPagination;
    if (!themeConfig) {
      return;
    }

    Object.keys(themeConfig).forEach(key => {
      this.__$dom.style.setProperty(key, themeConfig[key]);
    });
  }

  private __getPages(): number[] {
    const pages: number[] = [];
    const { totalPages } = this;
    const { currentPage } = this;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, -2, totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, -1, currentPage - 1, currentPage, currentPage + 1, -2, totalPages);
    }

    return pages;
  }

  private __handlePageClick(page: number) {
    if (page < 0 || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.onPageChange && this.onPageChange(page);
    this.__updatePages();
    this.emit('click:changed', {
      type: 'click',
      page
    });
  }

  private __handlePrevClick() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.onPageChange && this.onPageChange(this.currentPage);
      this.__updatePages();
      this.emit('click:changed', {
        type: 'prev',
        page: this.currentPage
      });
    }
  }

  private __handleNextClick() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.onPageChange && this.onPageChange(this.currentPage);
      this.__updatePages();
      this.emit('click:changed', {
        type: 'next',
        page: this.currentPage
      });
    }
  }

  private __updatePages() {
    // 重新渲染分页器
    const paginationContainer = this.__$dom;
    if (paginationContainer) {
      paginationContainer.innerHTML = '';
      this.__render();
    }
  }

  private __render() {
    const pages = this.__getPages();
    const $prevButton = document.createElement('div');
    $prevButton.classList.add(styles['prev-button'], styles.button);
    if (this.currentPage === 1) {
      $prevButton.classList.remove(styles.button);
      $prevButton.classList.add(styles['prev-button-disabled']);
    } else {
      $prevButton.classList.add(styles.button);
    }
    $prevButton.onclick = () => this.__handlePrevClick();
    this.__$dom.appendChild($prevButton);

    pages.forEach(page => {
      const $button = document.createElement('div');
      $button.classList.add(styles.button);
      if (page === this.currentPage) {
        $button.classList.add(styles['current-page']);
        $button.classList.remove(styles.button);
      }
      if (page === -1) {
        $button.classList.add(styles['left-page']);
        $button.classList.remove(styles.button);
      }
      if (page === -2) {
        $button.classList.add(styles['right-page']);
        $button.classList.remove(styles.button);
      }
      $button.textContent = page < 0 ? '' : page.toString();
      $button.onclick = () =>
        this.__handlePageClick(
          // eslint-disable-next-line no-nested-ternary
          page === -1
            ? Math.max(this.currentPage - 3, 1)
            : page === -2
            ? Math.min(this.currentPage + 3, this.totalPages)
            : page
        );
      this.__$dom.appendChild($button);
    });
    const $nextButton = document.createElement('div');
    $nextButton.classList.add(styles.button, styles['next-button']);
    if (this.currentPage === this.totalPages) {
      $nextButton.classList.remove(styles.button);
      $nextButton.classList.add(styles['next-button-disabled']);
    } else {
      $nextButton.classList.add(styles.button);
    }
    $nextButton.onclick = () => this.__handleNextClick();
    this.__$dom.appendChild($nextButton);
  }

  destroy() {
    this.__$dom.innerHTML = '';
    this.__$dom.remove();
  }
}

export default Pagination; 