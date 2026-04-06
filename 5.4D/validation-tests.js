/**
 * SIT725 – 5.4D Validation Tests (MANDATORY TEMPLATE)
 *
 * HOW TO RUN: (Node.js 18+ is required)
 *   1. Start MongoDB
 *   2. Start your server (npm start)
 *   3. node validation-tests.js
 *
 * DO NOT MODIFY:
 *   - Output format (TEST|, SUMMARY|, COVERAGE|)
 *   - test() function signature
 *   - Exit behaviour
 *   - coverageTracker object
 *   - Logging structure
 *
 * YOU MUST:
 *   - Modify makeValidBook() to satisfy your schema rules
 *   - Add sufficient tests to meet coverage requirements
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

function createPath() {
    return `${API_BASE}`;
}

function updatePath(id) {
    return `${API_BASE}/${id}`;
}

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
    CREATE_FAIL: 0,
    UPDATE_FAIL: 0,
    TYPE: 0,
    REQUIRED: 0,
    BOUNDARY: 0,
    LENGTH: 0,
    TEMPORAL: 0,
    UNKNOWN_CREATE: 0,
    UNKNOWN_UPDATE: 0,
    IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
// =============================

function logHeader(uniqueId) {
    console.log("SIT725_VALIDATION_TESTS");
    console.log(`BASE_URL=${BASE_URL}`);
    console.log(`API_BASE=${API_BASE}`);
    console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
    console.log(
        `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
    );
}

function logSummary() {
    const failed = results.filter(r => !r.pass).length;
    console.log(
        `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
    );
    return failed === 0;
}

function logCoverage() {
    console.log(
        `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
        `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
        `|TYPE=${coverageTracker.TYPE}` +
        `|REQUIRED=${coverageTracker.REQUIRED}` +
        `|BOUNDARY=${coverageTracker.BOUNDARY}` +
        `|LENGTH=${coverageTracker.LENGTH}` +
        `|TEMPORAL=${coverageTracker.TEMPORAL}` +
        `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
        `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
        `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
    );
}

// =============================
// HTTP HELPER
// =============================

async function http(method, path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    return { status: res.status, text };
}

// =============================
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags }) {

    const { status } = await http(method, path, body);
    const pass = status === expected;

    const result = { id, name, method, path, expected, actual: status, pass };
    results.push(result);
    logResult(result);

    // treat missing or invalid tags as []
    const safeTags = Array.isArray(tags) ? tags : [];

    safeTags.forEach(tag => {
        if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
            coverageTracker[tag]++;
        }
    });
}

// =============================
// STUDENT MUST MODIFY THESE
// =============================

function makeValidBook(id) {
    return {
        id,
        title: "A Valid Book Title",
        author: "Valid Author",
        year: 2020,
        genre: "Fiction",
        summary: "This is a valid summary with more than ten characters.",
        price: "19.99"
    };
}

function makeValidUpdate() {
    return {
        title: "Updated Title",
        author: "Updated Author",
        year: 2021,
        genre: "Mystery",
        summary: "Updated summary with enough length.",
        price: "25.50"
    };
}

// =============================
// REQUIRED BASE TESTS (DO NOT REMOVE)
// =============================

async function run() {

    const uniqueId = `b${Date.now()}`;
    logHeader(uniqueId);

    const updatePath = (id) => `${API_BASE}/${id}`;

    // ---- T01 Valid CREATE ----
    await test({
        id: "T01",
        name: "Valid create",
        method: "POST",
        path: createPath(),
        expected: 201,
        body: makeValidBook(uniqueId),
        tags: []
    });

    // ---- T02 Duplicate ID ----
    await test({
        id: "T02",
        name: "Duplicate ID",
        method: "POST",
        path: createPath(),
        expected: 409,
        body: makeValidBook(uniqueId),
        tags: ["CREATE_FAIL"]
    });

    // ---- T03 Immutable ID ----
    await test({
        id: "T03",
        name: "Immutable ID on update",
        method: "PUT",
        path: updatePath(uniqueId),
        expected: 400,
        body: { ...makeValidUpdate(), id: "b999" },
        tags: ["UPDATE_FAIL", "IMMUTABLE"]
    });

    // ---- T04 Unknown field CREATE ----
    await test({
        id: "T04",
        name: "Unknown field CREATE",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { ...makeValidBook(`b${Date.now() + 1}`), hack: true },
        tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
    });

    // ---- T05 Missing required title ----
    await test({
        id: "T05",
        name: "Missing required title field",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { author: "John Doe", year: 2020 },
        tags: ["REQUIRED", "CREATE_FAIL"]
    });

    // ---- T06 Missing required author ----
    await test({
        id: "T06",
        name: "Missing required author field",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "Silent Storm", year: 2021 },
        tags: ["REQUIRED", "CREATE_FAIL"]
    });

    // ---- T07 Wrong type: year as string ----
    await test({
        id: "T07",
        name: "Year provided as string instead of number",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "Mist Valley", author: "Kira", year: "2020" },
        tags: ["TYPE", "CREATE_FAIL"]
    });

    // ---- T08 Wrong type: price as boolean ----
    await test({
        id: "T08",
        name: "Price provided as boolean",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "Blue Horizon", author: "Sam", year: 2022, price: true },
        tags: ["TYPE", "CREATE_FAIL"]
    });

    // ---- T09 Title too short ----
    await test({
        id: "T09",
        name: "Title shorter than minimum length",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "A", author: "Leo", year: 2020 },
        tags: ["LENGTH", "CREATE_FAIL"]
    });

    // ---- T10 Author too long ----
    await test({
        id: "T10",
        name: "Author name exceeds maximum length",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "Deep Roots", author: "X".repeat(120), year: 2020 },
        tags: ["LENGTH", "CREATE_FAIL"]
    });

    // ---- T11 Year below minimum boundary ----
    await test({
        id: "T11",
        name: "Year below minimum allowed boundary",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "Ancient Scroll", author: "Mira", year: 1899 },
        tags: ["BOUNDARY", "CREATE_FAIL"]
    });

    // ---- T12 Future year ----
    await test({
        id: "T12",
        name: "Future year provided",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "Future Book", author: "Neo", year: 2099 },
        tags: ["TEMPORAL", "CREATE_FAIL"]
    });

    // ---- T13 Extremely old year ----
    await test({
        id: "T13",
        name: "Year extremely old",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "Ancient Myths", author: "Eon", year: 1500 },
        tags: ["TEMPORAL", "CREATE_FAIL"]
    });

    // ---- T14 Unknown field CREATE ----
    await test({
        id: "T14",
        name: "Unknown field included during CREATE",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { title: "Shadow Peak", author: "Lyn", year: 2020, mystery: "???" },
        tags: ["UNKNOWN_CREATE", "CREATE_FAIL"]
    });

    // ---- T15 Unknown field UPDATE ----
    await test({
        id: "T15",
        name: "Unknown field included during UPDATE",
        method: "PUT",
        path: updatePath(uniqueId),
        expected: 400,
        body: { ...makeValidUpdate(), hiddenFlag: true },
        tags: ["UNKNOWN_UPDATE", "UPDATE_FAIL"]
    });

    // ---- T16 Modify immutable _id ----
    await test({
        id: "T16",
        name: "Attempt to update immutable _id field",
        method: "PUT",
        path: updatePath(uniqueId),
        expected: 400,
        body: { _id: "1234567890" },
        tags: ["IMMUTABLE", "UPDATE_FAIL"]
    });

    // ---- T17 Modify immutable createdAt ----
    await test({
        id: "T17",
        name: "Attempt to update immutable createdAt field",
        method: "PUT",
        path: updatePath(uniqueId),
        expected: 400,
        body: { createdAt: "2000-01-01T00:00:00Z" },
        tags: ["IMMUTABLE", "UPDATE_FAIL"]
    });

    // ---- T18 Empty create body ----
    await test({
        id: "T18",
        name: "Create with empty body",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: {},
        tags: ["CREATE_FAIL"]
    });

    // ---- T19 Create with only unknown fields ----
    await test({
        id: "T19",
        name: "Create with only unknown fields",
        method: "POST",
        path: createPath(),
        expected: 400,
        body: { foo: "bar", test: 123 },
        tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
    });

    // ---- T20 Update required field to empty string ----
    await test({
        id: "T20",
        name: "Update required field to empty string",
        method: "PUT",
        path: updatePath(uniqueId),
        expected: 400,
        body: { title: "" },
        tags: ["UPDATE_FAIL"]
    });

    // ---- T21 Update with invalid type ----
    await test({
        id: "T21",
        name: "Update with invalid type for year",
        method: "PUT",
        path: updatePath(uniqueId),
        expected: 400,
        body: { year: "not-a-number" },
        tags: ["UPDATE_FAIL", "TYPE"]
    });

    // ---- T22 Update string field using array ----
    await test({
        id: "T22",
        name: "Update string field using array",
        method: "PUT",
        path: updatePath(uniqueId),
        expected: 400,
        body: { author: ["John", "Doe"] },
        tags: ["UPDATE_FAIL", "TYPE"]
    });

    // ---- T23 Update with empty object ----
    await test({
        id: "T23",
        name: "Update with empty object",
        method: "PUT",
        path: updatePath(uniqueId),
        expected: 400,
        body: {},
        tags: ["UPDATE_FAIL"]
    });

    const pass = logSummary();
    logCoverage();

    process.exit(pass ? 0 : 1);
}

run().catch(err => {
    console.error("ERROR", err);
    process.exit(2);
});