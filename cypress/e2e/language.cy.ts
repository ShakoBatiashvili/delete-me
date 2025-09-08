describe('Language Switch', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should switch to Russian and back to English', () => {
    // Check initial English content
    cy.contains('Lab Analyses and Constant Parameters').should('be.visible');
    cy.contains('Map').should('be.visible');
    
    // Switch to Russian
    cy.switchLanguage('ru');
    
    // Check Russian content
    cy.contains('Лабораторные анализы и постоянные параметры').should('be.visible');
    cy.contains('Карта').should('be.visible');
    
    // Switch back to English
    cy.switchLanguage('en');
    
    // Check English content is back
    cy.contains('Lab Analyses and Constant Parameters').should('be.visible');
    cy.contains('Map').should('be.visible');
  });

  it('should persist language choice after page reload', () => {
    // Switch to Russian
    cy.switchLanguage('ru');
    
    // Verify Russian content
    cy.contains('Карта').should('be.visible');
    
    // Reload page
    cy.reload();
    
    // Should still be in Russian
    cy.contains('Карта').should('be.visible');
    cy.contains('Лабораторные анализы и постоянные параметры').should('be.visible');
  });

  it('should translate navigation items', () => {
    // Switch to Russian
    cy.switchLanguage('ru');
    
    // Check navigation translations
    cy.get('[data-menu-id="inputs"]').should('contain', 'Входные данные');
    cy.get('[data-menu-id="calculate"]').should('contain', 'Расчет');
    cy.get('[data-menu-id="outputs"]').should('contain', 'Выходные данные');
  });

  it('should translate child navigation items', () => {
    // Switch to Russian
    cy.switchLanguage('ru');
    
    // Navigate to inputs
    cy.get('[data-menu-id="inputs"]').click();
    
    // Check child navigation translations
    cy.get('[data-menu-id="inputs-general"]').should('contain', 'Общие');
    cy.get('[data-menu-id="inputs-chemistry"]').should('contain', 'Химия');
    cy.get('[data-menu-id="inputs-consumption"]').should('contain', 'Потребление');
  });

  it('should translate page headers based on current section', () => {
    // Switch to Russian
    cy.switchLanguage('ru');
    
    // Navigate to chemistry -> reactor
    cy.get('[data-menu-id="inputs"]').click();
    cy.get('[data-menu-id="inputs-chemistry"]').click();
    cy.contains('Реактор').click();
    
    // Check if header shows translated reactor content
    cy.contains('Параметры стоков').should('be.visible');
  });

  it('should translate modal content', () => {
    // Navigate to parameters page
    cy.get('[data-menu-id="inputs"]').click();
    cy.get('[data-menu-id="inputs-general"]').click();
    
    // Switch to Russian
    cy.switchLanguage('ru');
    
    // Open add parameter modal
    cy.get('[data-testid="add-parameter-btn"]').first().click();
    
    // Check modal translations
    cy.contains('Добавить параметр').should('be.visible');
    cy.contains('Выберите химический элемент').should('be.visible');
    cy.contains('Сохранить').should('be.visible');
    cy.contains('Отменить').should('be.visible');
  });
});
