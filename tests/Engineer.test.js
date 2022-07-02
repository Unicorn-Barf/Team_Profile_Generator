const Engineer = require('../lib/Engineer');

describe('Engineer Class:', () => {
    describe('It creates a new object:', () => {
        it('Is a new instance of a Engineer class created with a name, id, email, and github', () => {
            const obj = new Engineer('Jasmine', 5, 'whynot@because.com', 'Unicorn-Barf');
            expect(obj).toBeInstanceOf(Engineer);
            expect(obj.name).toBe('Jasmine');
            expect(obj.id).toBe(5);
            expect(obj.email).toBe('whynot@because.com');
            expect(obj.github).toBe('Unicorn-Barf');
        })
    })

    describe('getRole() methods overrides the Employee class method', () => {

        it('Has a getRole() method that returns "Engineer"', () => {
            const obj = new Engineer('Jasmine', 5, 'whynot@because.com', 'Unicorn-Barf');
            expect(obj.getRole()).toBe('Engineer');
        });
    });
});