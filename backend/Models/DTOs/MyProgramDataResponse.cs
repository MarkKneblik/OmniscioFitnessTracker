// This class is meant to aggregate lists of days, exercises, and sets to be serialized
public class MyProgramDataResponse
{
    public List<DayDTO> Days { get; set; }
    public List<ExerciseDTO> Exercises { get; set; }
    public List<SetDTO> Sets { get; set; }
}