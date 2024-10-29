import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {

    // Create a team with name
    createTeam(req: Request, res: Response) {
        const { name } = req.body;
        const team = LeaderboardService.createTeam(name);
        res.status(201).json(team);
    }

    // Create a new counter for a specific team
    createCounter(req: Request, res: Response) {
      const { teamId, counterId } = req.params;
      try {
          const counter = LeaderboardService.createCounter(teamId, counterId);
          if (counter) res.status(201).json(counter);
          else res.status(404).json({ message: "Team not found" });
      } catch (error: any) {
          res.status(400).json({ message: error.message });
      }
    }

    // Increment counter for a team
    incrementCounter(req: Request, res: Response) {
        const { teamId, counterId, steps } = req.body;
        const team = LeaderboardService.incrementCounter(teamId, counterId, steps);
        if (team) res.json(team);
        else res.status(404).json({ message: "Team not found" });
    }

    // Get a team's total steps
    getTeamSteps(req: Request, res: Response) {
        const { teamId } = req.params;
        const steps = LeaderboardService.getTeamSteps(teamId);
        if (steps !== null) res.json({ steps });
        else res.status(404).json({ message: "Team not found" });
    }

    // List all teams with their total steps
    listTeams(req: Request, res: Response) {
        const teams = LeaderboardService.listTeams();
        res.json(teams);
    }

    // List all counters in a specific team
    listTeamCounters(req: Request, res: Response) {
        const { teamId } = req.params;
        const counters = LeaderboardService.listTeamCounters(teamId);
        if (counters) res.json(counters);
        else res.status(404).json({ message: "Team not found" });
    }

    // Delete a team by ID
    deleteTeam(req: Request, res: Response) {
        const { teamId } = req.params;
        const isDeleted = LeaderboardService.deleteTeam(teamId);
        if (isDeleted) res.status(204).end();
        else res.status(404).json({ message: "Team not found" });
    }

    // Delete a counter within a team by counter ID
    deleteCounter(req: Request, res: Response) {
        const { teamId, counterId } = req.params;
        const isDeleted = LeaderboardService.deleteCounter(teamId, counterId);
        if (isDeleted) res.status(204).end();
        else res.status(404).json({ message: "Counter not found" });
    }
}

export default new LeaderboardController();
