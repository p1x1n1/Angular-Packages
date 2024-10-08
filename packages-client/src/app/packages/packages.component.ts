import { Component } from '@angular/core';
import { PackageService } from '../service/package.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {
  packages: any[] = [];
  filteredPackages: any[] = [];
  dependencies = new Map<string, string[]>();

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe((data) => {
      this.packages = data;
      this.filteredPackages = data;
    });
  }


  refreshPackages(): void {
    this.loadPackages();
  }

  // Фильтрация 
  filterPackages(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchText = input.value;
    this.filteredPackages = this.packages.filter(pkg =>
      pkg.id.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  //Подсветка зависимостей
  highlightDependencies(pkgId: string): void {
    this.packageService.getPackageDependencies(pkgId).subscribe((dependencies) => {
      // console.log(dependencies)
      this.dependencies.set(pkgId, dependencies);
    });
  }
  
  clearHighlight(): void {
    this.dependencies.clear();
  }
  
  isHighlighted(pkgId: string): boolean {
    return Array.from(this.dependencies.values()).flat().includes(pkgId);
  }

  //Форматирование для количества скачивания зависимостей
  formatDownloads(downloads: number): string {
    if (downloads >= 1000000) {
      return (Math.floor(downloads / 1000000)) + 'M';
    } else if (downloads >= 1000) {
      return (Math.floor(downloads / 1000)) + 'K';
    } else {
      return downloads.toString();
    }
  }
  
}