import { parseIdFromUrl } from "../../utils/utils";

test('Should correctly retrieve id from url string', () => {
    let id = parseIdFromUrl('/a/b/12/c/21');
    expect(id).toBe(21);
    id = parseIdFromUrl('/a/b/12/c/21/');
    expect(id).toBe(21);
});