import React from "react";
import { TodoListLocalState } from "../../src/components/TodoListLocalState";

describe("<TodoListLocalState />", () => {
  it("renders", () => {
    cy.mount(<TodoListLocalState />);
    cy.get('[data-test-li="todo-item"]').should("have.length", 0);
    cy.get('[data-test-button="add-todo"]').click();
    cy.get('[data-test-li="todo-item"]').should("have.length", 1);
    cy.get('[data-test-button="add-todo"]').click();
    cy.get('[data-test-button="add-todo"]').click();
    cy.get('[data-test-button="add-todo"]').click();
    cy.get('[data-test-li="todo-item"]').should("have.length", 4);
  });
});
