export class Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  deleted: boolean;

  constructor(id: number, name: string, imageUrl: string, types: string[]) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.types = types;
    this.deleted = false;
  }

  delete(): void {
    this.deleted = true;
  }

  isDeleted(): boolean {
    return this.deleted;
  }

  matchesSearchTerm(searchTerm: string): boolean {
    return this.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           this.types.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}

