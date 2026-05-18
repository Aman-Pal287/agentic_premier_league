# MatchMind AI — deploy to Google Cloud Run
# Usage: .\scripts\deploy-cloudrun.ps1 -ProjectId "your-gcp-project" -Region "asia-south1"

param(
  [Parameter(Mandatory = $true)]
  [string]$ProjectId,
  [string]$Region = "asia-south1",
  [string]$ServiceName = "matchmind-ai",
  [string]$GeminiApiKey = ""
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

Write-Host "Setting GCP project: $ProjectId"
gcloud config set project $ProjectId

Write-Host "Enabling required APIs..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

$envArgs = @()
if ($GeminiApiKey) {
  $envArgs = @("--set-env-vars", "GEMINI_API_KEY=$GeminiApiKey")
} else {
  Write-Host "No -GeminiApiKey passed. Set GEMINI_API_KEY in Cloud Console after deploy, or re-run with -GeminiApiKey."
}

Write-Host "Deploying $ServiceName to Cloud Run ($Region)..."
gcloud run deploy $ServiceName `
  --source . `
  --region $Region `
  --platform managed `
  --allow-unauthenticated `
  @envArgs

Write-Host "Done. Service URL:"
gcloud run services describe $ServiceName --region $Region --format "value(status.url)"
