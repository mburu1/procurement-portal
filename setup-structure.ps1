# Create frontend structure
New-Item -ItemType Directory -Force -Path "frontend/public"
New-Item -ItemType Directory -Force -Path "frontend/src/assets/images"
New-Item -ItemType Directory -Force -Path "frontend/src/assets/icons"
New-Item -ItemType Directory -Force -Path "frontend/src/components/common"
New-Item -ItemType Directory -Force -Path "frontend/src/components/tender"
New-Item -ItemType Directory -Force -Path "frontend/src/components/bid"
New-Item -ItemType Directory -Force -Path "frontend/src/components/auth"
New-Item -ItemType Directory -Force -Path "frontend/src/components/dashboard"
New-Item -ItemType Directory -Force -Path "frontend/src/components/file"
New-Item -ItemType Directory -Force -Path "frontend/src/components/ui"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/public"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/auth"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/tenders"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/bids"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/dashboard"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/profile"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/contracts"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/entities"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/suppliers"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/reports"
New-Item -ItemType Directory -Force -Path "frontend/src/pages/error"
New-Item -ItemType Directory -Force -Path "frontend/src/context"
New-Item -ItemType Directory -Force -Path "frontend/src/hooks"
New-Item -ItemType Directory -Force -Path "frontend/src/services"
New-Item -ItemType Directory -Force -Path "frontend/src/utils"
New-Item -ItemType Directory -Force -Path "frontend/src/styles"
New-Item -ItemType Directory -Force -Path "frontend/src/routes"

# Create backend structure
New-Item -ItemType Directory -Force -Path "backend/src/config"
New-Item -ItemType Directory -Force -Path "backend/src/controllers"
New-Item -ItemType Directory -Force -Path "backend/src/models"
New-Item -ItemType Directory -Force -Path "backend/src/routes"
New-Item -ItemType Directory -Force -Path "backend/src/middleware"
New-Item -ItemType Directory -Force -Path "backend/src/validators"
New-Item -ItemType Directory -Force -Path "backend/src/utils"
New-Item -ItemType Directory -Force -Path "backend/src/services"
New-Item -ItemType Directory -Force -Path "backend/tests/unit"
New-Item -ItemType Directory -Force -Path "backend/tests/integration"
New-Item -ItemType Directory -Force -Path "backend/uploads/documents"
New-Item -ItemType Directory -Force -Path "backend/uploads/images"
New-Item -ItemType Directory -Force -Path "backend/uploads/temp"

# Create database structure
New-Item -ItemType Directory -Force -Path "database/migrations"
New-Item -ItemType Directory -Force -Path "database/seeds"

# Create docker structure
New-Item -ItemType Directory -Force -Path "docker/frontend"
New-Item -ItemType Directory -Force -Path "docker/backend"
New-Item -ItemType Directory -Force -Path "docker/postgres"

# Create other directories
New-Item -ItemType Directory -Force -Path "docs"
New-Item -ItemType Directory -Force -Path "postman"
New-Item -ItemType Directory -Force -Path "scripts"
New-Item -ItemType Directory -Force -Path ".github/workflows"

# Create placeholder files
New-Item -ItemType File -Force -Path "frontend/src/components/common/.gitkeep"
New-Item -ItemType File -Force -Path "backend/src/controllers/.gitkeep"
New-Item -ItemType File -Force -Path "database/migrations/.gitkeep"

Write-Host "Project structure created successfully!" -ForegroundColor Green