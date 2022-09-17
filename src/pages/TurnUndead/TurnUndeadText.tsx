import React, { ReactElement } from "react";
import { Typography } from "@mui/material";

export function TurnUndeadText(): ReactElement {
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Turn Undead
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        Good clerics and paladins and some neutral clerics can channel positive
        energy, which can halt, drive off (rout), or destroy undead.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        Evil clerics and some neutral clerics can channel negative energy, which
        can halt, awe (rebuke), control (command), or bolster undead.
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Regardless of the effect, the general term for the activity is
        “turning.” When attempting to exercise their divine control over these
        creatures, characters make turning checks.
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        <strong>Turning Checks</strong>
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        Turning undead is a supernatural ability that a character can perform as
        a standard action. It does not provoke attacks of opportunity.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        You must present your holy symbol to turn undead. Turning is considered
        an attack.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        <strong>Times per day: </strong>You may attempt to turn undead a number
        of times per day equal to 3 + your Charisma modifier. You can increase
        this number by taking the Extra Turning feat.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        <strong>Range: </strong>You turn the closest turnable undead first, and
        you can't turn undead that are more than 60 feet away or that have total
        cover relative to you. You don't need line of sight to a target, but you
        do need line of effect.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        <strong>Turning Check:</strong> The first thing you do is roll a turning
        check to see how powerful an undead creature you can turn. This is a
        Charisma check (1d20 + your Charisma modifier). A cleric with 5 or more
        ranks in Knowledge (religion) gets a +2 bonus on turning checks against
        undead. Table: Turning Undead gives you the Hit Dice of the most
        powerful undead you can affect, relative to your level. On a given
        turning attempt, you can turn no undead creature whose Hit Dice exceed
        the result on this table.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        <strong>Turning Damage: </strong> If your roll on Table: Turning Undead
        is high enough to let you turn at least some of the undead within 60
        feet, roll 2d6 + your cleric level + your Charisma modifier for turning
        damage. That's how many total Hit Dice of undead you can turn. If your
        Charisma score is average or low, it's possible to roll fewer Hit Dice
        of undead turned than indicated on Table: Turning Undead. You may skip
        over already turned undead that are still within range, so that you do
        not waste your turning capacity on them.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        <strong>Effect and Duration of Turning: </strong> Turned undead flee
        from you by the best and fastest means available to them. They flee for
        10 rounds (1 minute). If they cannot flee, they cower (giving any attack
        rolls against them a +2 bonus). If you approach within 10 feet of them,
        however, they overcome being turned and act normally. (You can stand
        within 10 feet without breaking the turning effect—you just can't
        approach them.) You can attack them with ranged attacks (from at least
        10 feet away), and others can attack them in any fashion, without
        breaking the turning effect.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        <strong>Destroying Undead: </strong>If you have twice as many levels (or
        more) as the undead have Hit Dice, you destroy any that you would
        normally turn.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        <strong>Sacred Boost: </strong>You can spend a turn attempt as standard
        action to place an aura of positive energy upon each creature within a
        60-ft. burst. Any cure spell cast on one of these creatures before the
        end of your next turn is automatically maximized, with no adjustment to
        the spell's level or casting time.
      </Typography>
      <Typography sx={{ marginBottom: 1 }}>
        <strong>Sun Domain: </strong>Once per day, you can perform a greater
        turning against undead in place of a regular turning. The greater
        turning is like a normal turning except that the undead creatures that
        would be turned are destroyed instead.
      </Typography>
    </>
  );
}
