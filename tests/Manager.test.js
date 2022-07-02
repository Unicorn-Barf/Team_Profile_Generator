const Manager = require('../lib/Manager');

describe('Employee Class:', () => {
    describe('It creates a new object:', () => {
        it('Is a new instance of a Manager object created with a name, id, email, and office number', () => {
            const obj = new Manager('Jasmine', 5, 'whynot@because.com', 69);
            expect(obj).toBeInstanceOf(Manager);
            expect(obj.name).toBe('Jasmine');
            expect(obj.id).toBe(5);
            expect(obj.email).toBe('whynot@because.com');
            expect(obj.officeNum).toBe(69);
        })
    })

    describe('getRole() methods overrides the Employee class method', () => {

        it('Has a getRole() method that returns "Manager"', () => {
            const obj = new Manager('Jasmine', 5, 'whynot@because.com', 69);
            expect(obj.getRole()).toBe('Manager');
        });
    });
});