describe('test requestly rules', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should modify response', () => {
    const staticResponseData = JSON.stringify({ modified: true });

    cy.contains('button', 'Fetch Response').click();

    cy.get('pre code').then(($code) => {
      const response = JSON.stringify(JSON.parse($code.text()));
      expect(response).to.equal(staticResponseData);
    });
  });

  it('should add request header', () => {
    const expectedHeader = { name: 'x-request-id', value: 'test-request-header' };
    
    cy.contains('button', 'Show Request Headers').click();

    cy.get('table').then(($table) => {
      $table.find('tr').each((_, row) => {
        const rowCells = [...row.querySelectorAll('td')];
        if (rowCells.length === 2) {
          const [headerName, headerValue] = rowCells.map((rowCell) => rowCell.innerHTML);
          if (headerName === expectedHeader.name) {
            expect(headerValue).to.equal(expectedHeader.value);
          }
        }
      });
    });
  });

  it('should add response header', () => {
    const expectedHeader = { name: 'x-response-id', value: 'test-response-header' };
    
    cy.contains('button', 'Show Response Headers').click();

    cy.get('table').then(($table) => {
      $table.find('tr').each((_, row) => {
        const rowCells = [...row.querySelectorAll('td')];
        if (rowCells.length === 2) {
          const [headerName, headerValue] = rowCells.map((rowCell) => rowCell.innerHTML);
          if (headerName === expectedHeader.name) {
            expect(headerValue).to.equal(expectedHeader.value);
          }
        }
      });
    });
  });
});
