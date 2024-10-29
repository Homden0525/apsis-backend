import { Team, Counter } from '../models/team';

class LeaderboardService {
    private teams: Team[] = [];

    // Create a new team
    createTeam(name: string): Team {
        const newTeam: Team = { id: generateId(), name, counters: [], totalSteps: 0 };
        this.teams.push(newTeam);
        return newTeam;
    }

    // Create a new counter within a team
    createCounter(teamId: string, counterId: string): Counter | null {
      const team = this.teams.find(t => t.id === teamId);
      if (!team) return null;

      // Check if counter already exists
      if (team.counters.some(c => c.id === counterId)) {
          throw new Error("Counter with this ID already exists in the team.");
      }

      // Create and add the new counter
      const newCounter: Counter = { id: counterId, steps: 0 };
      team.counters.push(newCounter);
      return newCounter;
  }

    // Increment counter for a team
    incrementCounter(teamId: string, counterId: string, steps: number): Team | null {
        const team = this.teams.find(t => t.id === teamId);
        if (!team) return null;

        const counter = team.counters.find(c => c.id === counterId);
        if (counter) {
            counter.steps += steps;
        } else {
            const newCounter: Counter = { id: counterId, steps };
            team.counters.push(newCounter);
        }
        team.totalSteps += steps;
        return team;
    }

    // Get a team's total steps
    getTeamSteps(teamId: string): number | null {
        const team = this.teams.find(t => t.id === teamId);
        return team ? team.totalSteps : null;
    }

    // List all teams and their total steps
    listTeams(): Team[] {
        return this.teams;
    }

    // List all counters in a team
    listTeamCounters(teamId: string): Counter[] | null {
        const team = this.teams.find(t => t.id === teamId);
        return team ? team.counters : null;
    }

    // Delete a team by ID
    deleteTeam(teamId: string): boolean {
        const teamIndex = this.teams.findIndex(t => t.id === teamId);
        if (teamIndex > -1) {
            this.teams.splice(teamIndex, 1);
            return true;
        }
        return false;
    }

    // Delete a counter within a team by counter ID
    deleteCounter(teamId: string, counterId: string): boolean {
        const team = this.teams.find(t => t.id === teamId);
        if (!team) return false;

        const counterIndex = team.counters.findIndex(c => c.id === counterId);
        if (counterIndex > -1) {
            team.totalSteps -= team.counters[counterIndex].steps;  // Adjust total steps
            team.counters.splice(counterIndex, 1);
            return true;
        }
        return false;
    }
}

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

export default new LeaderboardService();
