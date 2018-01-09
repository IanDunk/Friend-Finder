// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function (req, res) { // IS ADD RIGHT?
    res.sendFile(path.join(__dirname, "survey.html"));
});

// Get all friends IS THE SCOPE RIGHT?
app.get("/all", function (req, res) {
    res.json(friends);
});