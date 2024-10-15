import { Component } from '@angular/core';
import { PackageService } from '../service/package.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Packages } from './packages.interface';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {
  packages: Packages[] = [];
  filteredPackages: Packages[] = [];
  dependencies = new Set<string>();
  searchText: string = ''; 

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
  filterPackages(): void {
    this.filteredPackages = this.packages.filter(pkg =>
      pkg.id.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  //Подсветка зависимостей
  highlightDependencies(pkgId: string): void {
    this.packageService.getPackageDependencies(pkgId).subscribe((dependencies) => {
      // console.log(dependencies)
      dependencies.forEach(dep => this.dependencies.add(dep)); // Добавляем зависимости в Set
      // console.log(this.dependencies)
    });
  }
  
  clearHighlight(): void {
    this.dependencies.clear();
  }
  
  isHighlighted(pkgId: string): boolean {
    return this.dependencies.has(pkgId); 
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

  //Оптимизация перерисовки компонентов с помощью trackById
  trackById(index: number, pkg: Packages): string {
    return pkg.id;
  }
  
}