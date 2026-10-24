import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

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


