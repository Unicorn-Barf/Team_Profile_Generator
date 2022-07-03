const Intern = require('../lib/Intern');

describe('Intern Class:', () => {
    describe('It creates a new object:', () => {
        it('Is a new instance of a Intern class created with a name, id, email, and school', () => {
            const obj = new Intern('Jasmine', 5, 'whynot@because.com', 'UCSD');
            expect(obj).toBeInstanceOf(Intern);
            expect(obj.name).toBe('Jasmine');
            expect(obj.id).toBe(5);
            expect(obj.email).toBe('whynot@because.com');
            expect(obj.school).toBe('UCSD');
        })
    })

    describe('getRole() method overrides the Employee class method', () => {

        it('Has a getRole() method that returns "Intern"', () => {
            const obj = new Intern('Jasmine', 5, 'whynot@because.com', 'UCSD');
            expect(obj.getRole()).toBe('Intern');
        });
    });

    describe('getSchool() method', () => {
        it('should return the school passed into the parameters on creation', () => {
            const obj = new Intern('Jasmine', 5, 'whynot@because.com', 'UCSD');
            expect(obj.getSchool()).toBe('UCSD');
        });
    });
});