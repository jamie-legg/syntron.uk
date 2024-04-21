
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { TServerInfo } from "@/types/TApi"

export function ServerCard({ server }: {
  server: TServerInfo
}) {
  const { server_name, options, players, num_players, max_players} = server
  return (
    <Card className="w-full -pl-4">
      <CardHeader>
        <CardTitle>{server_name}</CardTitle>
        <CardDescription>
          {options}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Players</div>
          <div className="text-sm">
            {num_players}/{max_players}
          </div>
        </div>
        <div className="flex flex-col gap-1">
        {players.map((player, index) => (
          <div key={index} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?text=JS&width=32&height=32" />
              <AvatarFallback>{
                player[0].toUpperCase() + player[1].toUpperCase()
              }
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{player}</span>
          </div>
        ))}
        </div>
      </CardContent>
    </Card>
  )
}
