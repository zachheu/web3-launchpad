// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title TrustRegistry
 * @dev Contract untuk menyimpan dan mengelola trust score wallet
 * @notice Deploy ke Polygon Mainnet
 */
contract TrustRegistry {
    // Struct untuk menyimpan data trust
    struct TrustData {
        uint256 score;          // Trust score (0-100)
        uint256 lastUpdated;    // Timestamp terakhir update
        uint256 totalTx;        // Total transaksi
        uint256 walletAge;      // Umur wallet dalam hari
        bool isVerified;        // Status verifikasi
    }
    
    // Mapping dari address ke TrustData
    mapping(address => TrustData) public trustScores;
    
    // Array untuk tracking semua wallet yang terdaftar
    address[] public registeredWallets;
    mapping(address => bool) public isRegistered;
    
    // Owner contract
    address public owner;
    
    // Events
    event TrustScoreUpdated(
        address indexed wallet, 
        uint256 score, 
        uint256 timestamp
    );
    event WalletVerified(address indexed wallet, bool status);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Update trust score untuk sebuah wallet
     * @param _wallet Address wallet yang akan diupdate
     * @param _score Trust score baru (0-100)
     * @param _totalTx Total transaksi wallet
     * @param _walletAge Umur wallet dalam hari
     */
    function updateTrustScore(
        address _wallet,
        uint256 _score,
        uint256 _totalTx,
        uint256 _walletAge
    ) external onlyOwner {
        require(_score <= 100, "Score must be between 0-100");
        require(_wallet != address(0), "Invalid wallet address");
        
        // Register wallet jika belum
        if (!isRegistered[_wallet]) {
            registeredWallets.push(_wallet);
            isRegistered[_wallet] = true;
        }
        
        trustScores[_wallet] = TrustData({
            score: _score,
            lastUpdated: block.timestamp,
            totalTx: _totalTx,
            walletAge: _walletAge,
            isVerified: trustScores[_wallet].isVerified
        });
        
        emit TrustScoreUpdated(_wallet, _score, block.timestamp);
    }
    
    /**
     * @dev Set verification status untuk wallet
     * @param _wallet Address wallet
     * @param _status Status verifikasi
     */
    function setVerificationStatus(address _wallet, bool _status) external onlyOwner {
        require(isRegistered[_wallet], "Wallet not registered");
        trustScores[_wallet].isVerified = _status;
        emit WalletVerified(_wallet, _status);
    }
    
    /**
     * @dev Dapatkan trust score sebuah wallet
     * @param _wallet Address wallet
     * @return score Trust score wallet
     */
    function getTrustScore(address _wallet) external view returns (uint256 score) {
        return trustScores[_wallet].score;
    }
    
    /**
     * @dev Dapatkan semua data trust sebuah wallet
     * @param _wallet Address wallet
     * @return TrustData struct
     */
    function getTrustData(address _wallet) external view returns (TrustData memory) {
        return trustScores[_wallet];
    }
    
    /**
     * @dev Dapatkan total wallet terdaftar
     * @return Total registered wallets
     */
    function getTotalRegistered() external view returns (uint256) {
        return registeredWallets.length;
    }
    
    /**
     * @dev Batch update trust scores
     * @param _wallets Array of wallet addresses
     * @param _scores Array of scores
     */
    function batchUpdateScores(
        address[] calldata _wallets,
        uint256[] calldata _scores
    ) external onlyOwner {
        require(_wallets.length == _scores.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < _wallets.length; i++) {
            require(_scores[i] <= 100, "Score must be between 0-100");
            
            if (!isRegistered[_wallets[i]]) {
                registeredWallets.push(_wallets[i]);
                isRegistered[_wallets[i]] = true;
            }
            
            trustScores[_wallets[i]].score = _scores[i];
            trustScores[_wallets[i]].lastUpdated = block.timestamp;
            
            emit TrustScoreUpdated(_wallets[i], _scores[i], block.timestamp);
        }
    }
    
    /**
     * @dev Transfer ownership
     * @param newOwner Address owner baru
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
