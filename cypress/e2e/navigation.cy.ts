describe('Navigation Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the app with default map section', () => {
    cy.contains('Lab Analyses and Constant Parameters').should('be.visible');
    cy.contains('Interactive System Map').should('be.visible');
  });

  it('should navigate between main sections', () => {
    // Navigate to Inputs
    cy.get('[data-menu-id="inputs"]').should('be.visible').click();
    cy.contains('Input Parameters').should('be.visible');

    // Navigate to Calculate
    cy.get('[data-menu-id="calculate"]').should('be.visible').click();
    cy.contains('Calculate').should('be.visible');
    cy.contains('Calculation Engine').should('be.visible');

    // Navigate to Outputs
    cy.get('[data-menu-id="outputs"]').should('be.visible').click();
    cy.contains('Outputs').should('be.visible');
    cy.contains('Calculation Results').should('be.visible');

    // Navigate back to Map
    cy.get('[data-menu-id="map"]').should('be.visible').click();
    cy.contains('Interactive System Map').should('be.visible');
  });

  it('should show child navigation under Inputs', () => {
    cy.get('[data-menu-id="inputs"]').click();
    
    // Check if child items are visible
    cy.get('[data-menu-id="inputs-general"]').should('be.visible');
    cy.get('[data-menu-id="inputs-chemistry"]').should('be.visible');
    cy.get('[data-menu-id="inputs-consumption"]').should('be.visible');
  });

  it('should show unit navigation for Chemistry section', () => {
    cy.get('[data-menu-id="inputs"]').click();
    cy.get('[data-menu-id="inputs-chemistry"]').click();
    
    // Check if unit tabs are visible
    cy.contains('Ion Exchange - WMA').should('be.visible');
    cy.contains('Reactor').should('be.visible');
    cy.contains('Cooling Towers').should('be.visible');
    cy.contains('Flow Chemistry').should('be.visible');
  });

  it('should show sub-tabs for Flow Chemistry', () => {
    cy.get('[data-menu-id="inputs"]').click();
    cy.get('[data-menu-id="inputs-chemistry"]').click();
    
    // Click on Flow Chemistry tab
    cy.contains('Flow Chemistry').click();
    
    // Check if sub-tabs are visible
    cy.contains('Incoming Water Source Lab Inputs').should('be.visible');
    cy.contains('AutoCI Lab Inputs').should('be.visible');
    cy.contains('Chemical Injection Inputs').should('be.visible');
    cy.contains('Clear Chemistry').should('be.visible');
  });

  it('should collapse sidebar on mobile view', () => {
    // Simulate mobile viewport
    cy.viewport(375, 667);
    cy.reload();
    
    // Sidebar should be collapsed on mobile
    cy.get('.ant-layout-sider').should('not.be.visible');
    
    // Menu toggle should be visible
    cy.get('[data-testid="menu-toggle"]').should('be.visible');
  });
});
