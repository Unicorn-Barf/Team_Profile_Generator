const Employee = require('../lib/Employee');

describe('Employee Class:', () => {
    describe('It creates a new object:', () => {
        it('Is a new instance of Employee object created with a name, id, and email', () => {
            const obj = new Employee('Jasmine', 5, 'whynot@because.com');
            expect(obj).toBeInstanceOf(Employee);
            expect(obj.name).toBe('Jasmine');
            expect(obj.id).toBe(5);
            expect(obj.email).toBe('whynot@because.com');
        })
    })

    describe('Methods return correct data:', () => {
        it('Has a getName() method that returns the object name', () => {
            const obj = new Employee('Jasmine', 5, 'whynot@because.com');
            expect(obj.getName()).toBe('Jasmine');
        });

        it('Has a getId() method that returns the object ID', () => {
            const obj = new Employee('Jasmine', 5, 'whynot@because.com');
            expect(obj.getId()).toBe(5);
        });

        it('Has a getEmail() method that returns the object email', () => {
            const obj = new Employee('Jasmine', 5, 'whynot@because.com');
            expect(obj.getEmail()).toBe('whynot@because.com');
        });

        it('Has a getRole() method that returns the object role', () => {
            const obj = new Employee('Jasmine', 5, 'whynot@because.com');
            expect(obj.getRole()).toBe('Employee');
        });
    });
});