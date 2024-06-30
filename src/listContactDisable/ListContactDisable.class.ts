//crear una clase para guardar los contactos desactivados
export class ListContactDisable{
  public listContactsDisable: string[] = [];
  //añadir un contacto a la lista de contactos desactivados
  addContactDisable(contact: string){
    this.listContactsDisable.push(contact);
  }
  //eliminar un contacto de la lista de contactos desactivados
  removeContactDisable(contact: string){
    const index = this.listContactsDisable.indexOf(contact);
    if (index > -1) {
      this.listContactsDisable.splice(index, 1);
    }
  }
  //borrar todos los contactos de la lista de contactos desactivados
  removeAllContactDisable(){
    this.listContactsDisable = [];
  }
  //miramos si esta en la lista de contactos desactivados
  isContactDisable(contact: string){
    if(this.listContactsDisable.includes(contact)){
      return true;
    }
    return false;
  }
}