import { CombatantConstructor } from './constructors';

declare global {
    /**
     * The Combatant embedded document within a Combat document which extends the BaseRollTable abstraction.
     * Each Combatant belongs to the effects collection of its parent Document.
     * Each Combatant contains a CombatantData object which provides its source data.
     *
     * @see {@link data.CombatantData} The Combatant data schema
     * @see {@link documents.Combat}   The Combat document which contains Combatant embedded documents
     */
    class Combatant<TActor extends Actor = Actor> extends CombatantConstructor {
        /** @override */
        constructor(data: Partial<foundry.data.CombatantData>, context?: DocumentModificationContext);

        /** A cached reference to the Token which this Combatant represents, if any */
        protected _token: Token | null;

        /** A cached reference to the Actor which this Combatant represents, if any */
        protected _actor: TActor | null;

        /** The current value of the special tracked resource which pertains to this Combatant */
        resource: object | null;

        /* -------------------------------------------- */
        /*  Properties                                  */
        /* -------------------------------------------- */

        /**
         * Determine the image icon path that should be used to portray this Combatant in the combat tracker or
         * elsewhere
         */
        get img(): string;

        /** A convenience reference to the current initiative score of this Combatant */
        get initiative(): number | null;

        /**
         * This is treated as a non-player combatant if it has no associated actor and no player users who can control
         * it
         */
        get isNPC(): boolean;

        /** @override */
        get isOwner(): boolean;

        /** Is this Combatant entry currently visible in the Combat Tracker? */
        get isVisible(): boolean;

        /**
         * Is this Combatant "hidden", either because they are explicitly marked as hidden or because their token is
         * hidden
         */
        get hidden(): boolean;

        /**
         * The displayed name for the Combatant is based off its own configured data, or the data of its represented
         * Token.
         */
        get name(): string;

        /** A reference to the Actor document which this Combatant represents, if any */
        get actor(): TActor;

        /** A reference to the Token document which this Combatant represents, if any */
        get token(): Token<TActor> | null;

        /** An array of User documents who have ownership of this Document */
        get players(): User[];

        /* -------------------------------------------- */
        /*  Methods                                     */
        /* -------------------------------------------- */

        /** @override */
        testUserPermission(
            user: foundry.documents.BaseUser,
            permission: DocumentPermission,
            { exact }?: { exact?: boolean },
        ): boolean;

        /**
         * Get a Roll object which represents the initiative roll for this Combatant.
         * @param formula An explicit Roll formula to use for the combatant.
         * @return The Roll instance to use for the combatant.
         */
        getInitiativeRoll(formula: string): Roll;

        /**
         * Roll initiative for this particular combatant.
         * @param [formula] A dice formula which overrides the default for this Combatant.
         * @return The Roll instance to use for the combatant.
         */
        rollInitiative(formula: string): Roll;

        /** @override */
        prepareDerivedData(): void;

        /** Update the value of the tracked resource for this Combatant. */
        updateResource(): object | null;

        /**
         * Acquire the default dice formula which should be used to roll initiative for this combatant.
         * Modules or systems could choose to override or extend this to accommodate special situations.
         * @return The initiative formula to use for this combatant.
         */
        protected _getInitiativeFormula(): string;
    }

    interface Combatant {
        /** @param [data={}] Initial data provided to construct the Combatant document */
        readonly data: foundry.data.CombatantData<Combatant>;

        /** @param parent The parent document to which this Combatant belongs */
        parent: Combat;
    }
}
