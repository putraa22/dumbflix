package repositories

import (
	"dumbflix/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	CreateTransaction(transactions models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, ID string) error
	DeleteTransaction(transactoin models.Transaction) (models.Transaction, error)

	// Declare UpdateTransaction repository method ...

}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transactions models.Transaction
	err := r.db.Preload("User").First(&transactions, ID).Error

	return transactions, err
}

// Create GetOneTransaction method ...
func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").First(&transaction, "id=?", ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transactions models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("User").Create(&transactions).Error

	return transactions, err
}

// Create UpdateTransaction method ...
func (r *repository) UpdateTransaction(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("User").First(&transaction, ID)

	if status != transaction.Status && status == "success" {
		var user models.User
		r.db.First(&user, transaction.User.ID)
		user.Status = true
		r.db.Save(&user)
	}

	transaction.Status = status
	err := r.db.Save(&transaction).Error

	return err

}

func (r *repository) DeleteTransaction(transactoin models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("User").Delete(&transactoin).Error

	return transactoin, err
}
