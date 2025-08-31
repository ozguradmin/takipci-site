// Client-side search system
class SearchSystem {
  constructor() {
    this.rankingsData = null;
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch('/data/rankings.json');
      this.rankingsData = await response.json();
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    }
  }

  searchUser(username, date) {
    if (!this.rankingsData || !this.rankingsData[date]) {
      return null;
    }

    const rankings = this.rankingsData[date];
    return rankings.find(user => user.username === username);
  }

  getAllUsers(date) {
    if (!this.rankingsData || !this.rankingsData[date]) {
      return [];
    }
    return this.rankingsData[date];
  }

  getTop5(date) {
    const users = this.getAllUsers(date);
    return users.slice(0, 5);
  }

  getLatestDate() {
    if (!this.rankingsData) return null;
    const dates = Object.keys(this.rankingsData).sort().reverse();
    return dates[0];
  }
}

// Global search instance
window.searchSystem = new SearchSystem();
