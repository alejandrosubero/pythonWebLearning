// import { Injectable, signal, computed } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class SearchService {
//   private querySignal = signal('');

//   query = computed(() => this.querySignal().toLowerCase());

//   setQuery(value: string) {
//     this.querySignal.set(value);
//   }

//   clear() {
//     this.querySignal.set('');
//   }
// }

import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private querySignal = signal('');
  
  // ✅ CORRECTO: Computed que reacciona a cambios
  query = computed(() => this.querySignal().toLowerCase());

  setQuery(value: string) {
    this.querySignal.set(value);
  }

  clear() {
    this.querySignal.set('');
  }
}