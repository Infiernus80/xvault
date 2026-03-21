export function renderUppyMvcExamplePage(tusEndpoint: string): string {
	const safeTusEndpoint = JSON.stringify(tusEndpoint);

	return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Uppy + TUS Upload (MVC Example)</title>
  <link rel="stylesheet" href="https://releases.transloadit.com/uppy/v3.26.1/uppy.min.css" />
  <style>
    :root {
      --bg: #f6f8fb;
      --card: #ffffff;
      --border: #d8dee9;
      --text: #17212b;
      --muted: #5d6a78;
      --ok: #1f8f4c;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(120deg, #edf2f7, #f8fbff);
      color: var(--text);
    }
    .container {
      max-width: 1024px;
      margin: 0 auto;
      padding: 24px;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
    }
    h1 { margin: 0 0 8px; font-size: 26px; }
    h2 { margin: 0 0 12px; font-size: 18px; }
    p, li { color: var(--muted); line-height: 1.45; }
    code {
      background: #eef3fa;
      border-radius: 6px;
      padding: 2px 6px;
      color: #1e3655;
    }
    .status {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 600;
      color: var(--ok);
      min-height: 20px;
    }
    .meta { margin-top: 10px; padding-left: 18px; }
    .meta li { margin-bottom: 4px; }
  </style>
</head>
<body>
  <main class="container">
    <section class="card">
      <h1>Uppy + TUS (MVC) Frontend Example</h1>
      <p>This page uploads files to your backend TUS route at <code id="endpoint"></code>.</p>
      <ul class="meta">
        <li>Pattern: Model / View / Controller in plain JavaScript</li>
        <li>Uploader: Uppy Dashboard + TUS plugin</li>
        <li>Chunked + resumable uploads supported by TUS protocol</li>
      </ul>
    </section>

    <section class="card">
      <h2>Upload Demo</h2>
      <div id="uppy-dashboard"></div>
      <div id="upload-status" class="status"></div>
    </section>
  </main>

  <script type="module">
    import { Uppy, Dashboard, Tus } from "https://releases.transloadit.com/uppy/v3.26.1/uppy.min.mjs";

    class TusUploadModel {
      constructor(config) {
        this.endpoint = config.endpoint;
      }

      createUploader() {
        return new Uppy({
          autoProceed: false,
          allowMultipleUploadBatches: true,
          restrictions: {
            minNumberOfFiles: 1
          }
        }).use(Dashboard, {
          inline: true,
          target: "#uppy-dashboard",
          proudlyDisplayPoweredByUppy: false,
          showProgressDetails: true
        }).use(Tus, {
          endpoint: this.endpoint,
          chunkSize: 6 * 1024 * 1024,
          retryDelays: [0, 1000, 3000, 5000]
        });
      }
    }

    class TusUploadView {
      constructor() {
        this.statusNode = document.getElementById("upload-status");
        this.endpointNode = document.getElementById("endpoint");
      }

      showEndpoint(endpoint) {
        this.endpointNode.textContent = endpoint;
      }

      renderStatus(message) {
        this.statusNode.textContent = message;
      }
    }

    class TusUploadController {
      constructor(model, view) {
        this.model = model;
        this.view = view;
      }

      init() {
        this.view.showEndpoint(this.model.endpoint);
        this.uppy = this.model.createUploader();

        this.uppy.on("upload", () => {
          this.view.renderStatus("Upload started...");
        });

        this.uppy.on("upload-success", (file) => {
          this.view.renderStatus(\`Uploaded: \${file.name}\`);
        });

        this.uppy.on("complete", (result) => {
          this.view.renderStatus(\`Completed. Successful files: \${result.successful.length}\`);
        });

        this.uppy.on("error", (error) => {
          this.view.renderStatus(\`Upload error: \${error.message}\`);
        });
      }
    }

    const endpoint = new URL(${safeTusEndpoint}, window.location.origin).toString();
    const model = new TusUploadModel({ endpoint });
    const view = new TusUploadView();
    const controller = new TusUploadController(model, view);
    controller.init();
  </script>
</body>
</html>`;
}
