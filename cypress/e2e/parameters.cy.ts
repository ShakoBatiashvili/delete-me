describe('Parameter Management', () => {
  beforeEach(() => {
    cy.visit('/');
    // Navigate to inputs -> general to see parameters table
    cy.get('[data-menu-id="inputs"]').click();
    cy.get('[data-menu-id="inputs-general"]').click();
  });

  it('should display existing parameters', () => {
    // Check if table exists with default parameters
    cy.contains('General Parameters').should('be.visible');
    cy.contains('pH').should('be.visible');
    cy.contains('Temperature').should('be.visible');
    cy.contains('Turbidity').should('be.visible');
  });

  it('should edit parameter values', () => {
    // Click on a parameter value to edit
    cy.contains('7.25').click();
    
    // Input field should appear
    cy.get('input').should('be.focused');
    
    // Change the value
    cy.get('input').clear().type('7.50');
    cy.get('input').blur();
    
    // Value should be updated and displayed with 2 decimals
    cy.contains('7.50').should('be.visible');
  });

  it('should validate negative values', () => {
    // Try to enter a negative value
    cy.contains('7.25').click();
    cy.get('input').clear().type('-1.5');
    cy.get('input').blur();
    
    // Should show error message
    cy.contains('Value cannot be negative').should('be.visible');
  });

  it('should show raw value in tooltip', () => {
    // Hover over a parameter value
    cy.contains('7.25').trigger('mouseover');
    
    // Tooltip should show raw value
    cy.contains('Raw value: 7.25').should('be.visible');
  });

  it('should add new parameter', () => {
    // Click add parameter button
    cy.get('[data-testid="add-parameter-btn"]').first().click();
    
    // Modal should open
    cy.contains('Add Parameter').should('be.visible');
    
    // Select an element
    cy.get('[data-testid="element-select"]').click();
    cy.contains('Sodium (Na)').click();
    
    // Enter value
    cy.get('[data-testid="value-input"]').type('1.5');
    
    // Enter unit
    cy.get('[data-testid="unit-input"]').type('mg/L');
    
    // Save
    cy.get('[data-testid="save-parameter-btn"]').click();
    
    // Should show success message
    cy.contains('Parameter added successfully').should('be.visible');
    
    // Parameter should appear in table
    cy.contains('Sodium (Na)').should('be.visible');
    cy.contains('1.50').should('be.visible');
    cy.contains('mg/L').should('be.visible');
  });

  it('should remove parameter', () => {
    // Find a parameter row and click delete
    cy.get('[data-row-key]').first().within(() => {
      cy.get('[data-testid="delete-parameter-btn"]').click();
    });
    
    // Should show confirmation or success message
    cy.contains('Parameter removed successfully').should('be.visible');
  });

  it('should edit group description', () => {
    // Click edit group button
    cy.get('[data-testid="edit-group-btn"]').first().click();
    
    // Modal should open
    cy.contains('Edit Group').should('be.visible');
    
    // Change description
    cy.get('textarea').clear().type('Updated group description for testing purposes');
    
    // Save
    cy.get('[data-testid="save-group-btn"]').click();
    
    // Should show success message
    cy.contains('Group description updated successfully').should('be.visible');
    
    // Updated description should be visible
    cy.contains('Updated group description for testing purposes').should('be.visible');
  });

  it('should persist parameters after page reload', () => {
    // Add a parameter
    cy.addParameter('Potassium (K)', 2.1, 'mg/L');
    
    // Reload page
    cy.reload();
    
    // Navigate back to parameters
    cy.get('[data-menu-id="inputs"]').click();
    cy.get('[data-menu-id="inputs-general"]').click();
    
    // Parameter should still be there
    cy.contains('Potassium (K)').should('be.visible');
    cy.contains('2.10').should('be.visible');
  });
});
