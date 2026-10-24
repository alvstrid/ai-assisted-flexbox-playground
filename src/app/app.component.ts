import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type Justification = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type Alignment = 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly themeStorageKey = 'flexbox-playground-theme';
  readonly isDark = signal(this.readInitialTheme());

  constructor() {
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark.update(value => !value);
    this.applyTheme();
    try {
      this.document.defaultView?.localStorage.setItem(
        this.themeStorageKey, this.isDark() ? 'dark' : 'light'
      );
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  private readInitialTheme(): boolean {
    const browser = this.document.defaultView;
    try {
      const savedTheme = browser?.localStorage.getItem(this.themeStorageKey);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme === 'dark';
      }
    } catch {
      // Fall back to the system preference when storage is unavailable.
    }
    return browser?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
  }

  private applyTheme(): void {
    this.document.documentElement.dataset['theme'] = this.isDark() ? 'dark' : 'light';
  }

  readonly direction = signal<Direction>('row');
  readonly justification = signal<Justification>('center');
  readonly alignment = signal<Alignment>('center');
  readonly gap = signal(16);
  readonly copyStatus = signal('');
  readonly directions: Direction[] = ['row', 'row-reverse', 'column', 'column-reverse'];
  readonly justifications: Justification[] = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
  readonly alignments: Alignment[] = ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'];
  readonly css = computed(() => `.container {\n  display: flex;\n  flex-direction: ${this.direction()};\n  justify-content: ${this.justification()};\n  align-items: ${this.alignment()};\n  gap: ${this.gap()}px;\n}`);

  setDirection(event: Event): void {
    this.copyStatus.set('');
    this.direction.set((event.target as HTMLSelectElement).value as Direction);
  }
  setJustification(event: Event): void {
    this.copyStatus.set('');
    this.justification.set((event.target as HTMLSelectElement).value as Justification);
  }
  setAlignment(event: Event): void {
    this.copyStatus.set('');
    this.alignment.set((event.target as HTMLSelectElement).value as Alignment);
  }
  setGap(event: Event): void {
    this.copyStatus.set('');
    this.gap.set(Number((event.target as HTMLInputElement).value));
  }

  async copyCss(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.css());
      this.copyStatus.set('Copied to clipboard');
    } catch {
      this.copyStatus.set('Copy unavailable. Select and copy the CSS below.');
    }
  }
}


